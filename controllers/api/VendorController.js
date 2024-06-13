const Vendor = require('../../models/vendor');
require('dotenv').config();
const mailjet = require('node-mailjet').apiConnect( process.env.MJAPI, process.env.MJSECRETKEY);

const exceljs = require('exceljs');
const { Buffer } = require('buffer');
const Finance = require('../../models/finance');
const bcrypt = require('bcryptjs');
const CryptoJS = require('crypto-js');

const getFinanceDetails = async () => {
  const finance = await Finance.findOne({
    where: { finance_id: 1 },
    attributes: ['finance_email', 'finance_name','document_password'],
    raw: true,
    hooks: false,
  });

  if (!finance) {
    throw new Error('Finance details not found');
  }
  return finance;
};

const createEmailInfo = async () => {
  const finance = await getFinanceDetails();

  return {
    email: finance.finance_email,
    password: finance.document_password,
    name: finance.finance_name
  };
};

module.exports = {
  newVendor: async (req, res) => {
    try {
      const emailInfo = await createEmailInfo();
      const finance = await getFinanceDetails();
      const { email, password, name } = emailInfo;

      const {
        body: {
          vendor_name,
          contact_firstName,
          contact_lastName,
          contact_MiddleInt,
          tax_id,
          contact_phone_number,
          remittance_address,
          city,
          state,
          zip_code,
          country,
          remittance_email,
          service_provided,
          minority_ownership,
          authorized_name,
          authorized_phone_number,
          authorized_signature,
          bank_name,
          account_number,
          routing_number,
        },
      } = req;

      const vendorData = await Vendor.create({
        vendor_name,
        contact_firstName,
        contact_lastName,
        contact_MiddleInt,
        tax_id,
        contact_phone_number,
        remittance_address,
        city,
        state,
        zip_code,
        country,
        remittance_email,
        service_provided,
        minority_ownership,
        authorized_name,
        authorized_phone_number,
        authorized_signature,
        bank_name,
        account_number,
        routing_number,
      });

      const workbook = new exceljs.Workbook();
      const worksheet = workbook.addWorksheet('Vendor Data');
      const labels = [
        'Vendor Name',
        'Contact First Name',
        'Contact Last Name',
        'Contact Middle Intial',
        'Tax Id',
        'Contact Phone Number',
        'Remittance Address',
        'City',
        'State',
        'Zip Code',
        'Country',
        'Remittance Email',
        'Service Provided',
        'Minority Ownership',
        'Authorized Name',
        'Authorized Phone Number',
        'Authorized Signature',
        'Bank Name',
        'Account Number',
        'Routing Number',
      ];

      worksheet.addRow(labels);
      worksheet.getRow(1).font = { bold: true };

      worksheet.columns.forEach((column, i) => {
        if (i !== 16) {
          let maxLength = 0;
          column.eachCell({ includeEmpty: true }, (cell) => {
            const columnLength = cell.value ? cell.value.toString().length : 10;
            if (columnLength > maxLength) {
              maxLength = columnLength;
            }
          });
          column.width = maxLength < 10 ? 10 : maxLength;
        }
      });

      worksheet.addRow([
        vendor_name,
        contact_firstName,
        contact_lastName,
        contact_MiddleInt,
        tax_id,
        contact_phone_number,
        remittance_address,
        city,
        state,
        zip_code,
        country,
        remittance_email,
        service_provided,
        minority_ownership,
        authorized_name,
        authorized_phone_number,
        authorized_signature,
        bank_name,
        account_number,
        routing_number,
      ]);

      worksheet.columns.forEach((column, i) => {
        if (i !== 16) {
          let maxLength = 0;
          column.eachCell({ includeEmpty: true }, (cell) => {
            const columnLength = cell.value ? cell.value.toString().length : 10;
            if (columnLength > maxLength) {
              maxLength = columnLength;
            }
          });
          column.width = maxLength < 10 ? 10 : maxLength;
        }
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const bufferBase64 = buffer.toString('base64');

      const mailOptions = {
        Messages: [
          {
            From: {
              Email: vendorData.remittance_email, 
              Name: vendorData.vendor_name,
            },
            To: [
              {
                Email: email,
                Name: name,
              },
            ],
            Subject: `New Vendor Alert for ${vendorData.vendor_name}`,
            TextPart: `${vendorData.vendor_name} has been signed up as a new vendor.`,
            Attachments: [
              {
                ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                Filename: `${vendorData.vendor_name} vendor_data.xlsx`,
                Base64Content: bufferBase64,
              },
            ],
          },
        ],
      };

      const request = mailjet.post('send', { version: 'v3.1' }).request(mailOptions);

      request
        .then(result => {
          console.log(result.body);
        })
        .catch(err => {
          console.error(err.statusCode);
        });

      res.status(200).json(vendorData);
    } catch (err) {
      console.error(err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  },
};