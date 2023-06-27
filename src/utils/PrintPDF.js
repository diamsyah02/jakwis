import RNHTMLtoPDF from 'react-native-html-to-pdf'
import RNPrint from 'react-native-print'

const PrintPDF = async (detail, fullname) => {
    const results = await RNHTMLtoPDF.convert({
        html: `
            <h1>Rp ${parseInt(detail.qty) * parseInt(detail.price)} - PAID</h1>
            <p>${fullname}</p>
            <h3>${detail.title}</h3>
            <p>${detail.qty} Ticket</p>
            <p>${detail.address}</p>
            <p>${detail.created_at}</p>
            <img src="https://jakwis.diamsyahh.com/assets/qrcode/${detail.wisata_id}.png" width="150" height="150"/>
        `,
        fileName: 'test',
        base64: true,
    });
    await RNPrint.print({ filePath: results.filePath });
}

export default PrintPDF