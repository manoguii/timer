import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
  return (
    <HistoryContainer>
      <h1>Meu Historico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          </thead>
          <tr>
            <td>Tarefa </td>
            <td>20 minutos </td>
            <td>ha 2 meses </td>
            <Status statusColor="green">Concluido</Status>
          </tr>
          <tr>
            <td>Tarefa </td>
            <td>20 minutos </td>
            <td>ha 2 meses </td>
            <Status statusColor="red">Interrompido</Status>
          </tr>
          <tr>
            <td>Tarefa </td>
            <td>20 minutos </td>
            <td>ha 2 meses </td>
            <Status statusColor="yellow">Em conclusão</Status>
          </tr>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
