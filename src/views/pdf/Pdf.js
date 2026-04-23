import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer'
import QRCode from 'qrcode'
Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf',
  fontWeight: 'normal',
})

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 10,
    textAlign: 'center',
    color: '#2e2e2e',
    marginTop: 8,
    fontFamily: 'Roboto',
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
    borderBottom: '1px solid #ddd',
    paddingBottom: 2,
    paddingHorizontal: 14,
  },
  text: {
    fontSize: 12,
    fontFamily: 'Roboto',
  },
  qrcode: {
    width: '80px',
    height: '80px',
    marginHorizontal: 'auto',
  },
})

// Create Document Component
const Pdf = ({ title, qrLink }) => (
  <Document>
    <Page size={{ width: '90mm', height: '55mm' }} style={styles.page}>
      <View>
        {qrLink ? <Image style={styles.qrcode} src={QRCode.toDataURL(qrLink)} /> : null}
        {title ? <Text style={styles.title}>{title}</Text> : null}
      </View>
    </Page>
  </Document>
)

export default Pdf
