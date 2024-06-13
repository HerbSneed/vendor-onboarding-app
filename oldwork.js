const mailjectSecretKey = '66e7417e5a48af321e68e7c1db841e5e';
const mailjetApi = '179a2105abdd7d109bd35facba573c4e';
const mailjet = require('node-mailjet').connect(mailjetApi, mailjectSecretKey);


const Vendor = require('../../models/vendor');
const nodemailer = require('nodemailer');
const exceljs = require('exceljs');
const { Buffer } = require('buffer');
const Finance = require('../../models/finance');
const bcrypt = require('bcryptjs');
const CryptoJS = require('crypto-js');

const getFinanceDetails = async () => {
  // Fetch the finance details from the database
  const finance = await Finance.findOne({
    where: { finance_id: 1 },
    attributes: ['finance_email', 'document_password'], 
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
    password: finance.document_password
  };
};

module.exports = {
  newVendor: async (req, res) => {
    try {
      const emailInfo = await createEmailInfo(); 
      const finance = await getFinanceDetails(); 
      const { email, password } = emailInfo;

      const transporter = nodemailer.createTransport({
        service: 'Outlook',
        auth: {
          user: 'twistedtech2323@outlook.com',
          pass: 'Sneed2628191931$',
        }
      });


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
          routing_number
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
        routing_number
      });



      const workbook = new exceljs.Workbook();
      const worksheet = workbook.addWorksheet('Vendor Data');
      const labels = [
        { text: 'Vendor Name', bold: true },
        // Add other labels
      ];

      // Add rows and columns to the worksheet

      const buffer = await workbook.xlsx.writeBuffer();
      const encryptionKey = password;
      const encryptedBuffer = CryptoJS.AES.encrypt(buffer.toString('base64'), encryptionKey).toString();

      const mailOptions = {
        from: email,
        to: [venderData.remittance_email ],
        subject: `New Vendor Alert for ${vendorData.vendor_name}`,
        text: `${vendorData.vendor_name} has been signed up as a new vendor.`,
        attachments: [{
          filename: `${vendorData.vendor_name} vendor_data.xlsx.enc`,
          content: encryptedBuffer,
        }],
      };

      const info = await transporter.sendMail(mailOptions);
      if (info.messageId) {
        console.log('Email sent successfully!');
      } else {
        throw new Error('Email could not be sent');
      }

      // Hash the password after using it
      const hashedPassword = await bcrypt.hash(password, 10);
      finance.document_password = await bcrypt.hash(password, 10);
      await Finance.update(
        { document_password: finance.document_password },
        { where: { finance_id: 1 } }
      );

      res.status(200).json(vendorData);
    } catch (err) {
      console.error(err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  },
};
