import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  header: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#D9D9D9',
    textAlign: 'center',
    width: '100%',
    borderRadius: 5,
    border: '2px solid #cdcdcd'
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  headerDate: {
    fontSize: 12,
    marginTop: 5
  },
  headerTextUsername: {
    fontSize: 14,
  }
})

export function DocumentReportHeader(props) {
  const { reportType } = props

  const textType = reportType => {
    if (reportType === 'professional') {
      return (
        <View style={styles.header}>
          <Text style={styles.headerText}>Relatório por profissional</Text>
        </View>
      )
    } else if (reportType === 'period') {
      return (
        <View style={styles.header}>
          <Text style={styles.headerText}>Relatório por período</Text>
          <Text style={styles.headerDate}>De: {props.initialDate} Até: {props.finalDate}</Text>
        </View>
      )
    } else if (reportType === 'day') {
      return (
        <View style={styles.header}>
          <Text style={styles.headerText}>Relatório por dia</Text>
          <Text style={styles.headerDate}>Data: {props.day}</Text>
        </View>
      )
    } else if (reportType === 'month') {
      return (
        <View style={styles.header}>
          <Text style={styles.headerText}>Relatório por mês</Text>
          <Text style={styles.headerDate}>Mês: {props.month}/{props.year}</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.header}>
          <Text style={styles.headerText}>Relatório</Text>
        </View>
      )
    }
  }

  return (
    <View style={styles.header}>
      {textType(reportType)}
      <Text style={styles.headerText}>Clínica {props.clinicName}</Text>
      <Text style={styles.headerTextUsername}>Gerado por {props.user}</Text>
      <Text style={styles.headerDate}>Data: {new Date().toLocaleDateString()}</Text>
    </View>
  )
}
