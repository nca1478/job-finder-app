// Dependencies
import { Table, Button } from 'react-bootstrap'

export const TableSectors = (props) => {
  const { sectors, handleEdit, handleDelete } = props
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th className="text-center">Id</th>
          <th>Nombre</th>
          <th className="text-center">Acción</th>
        </tr>
      </thead>
      <tbody>
        {sectors.map((sector) => {
          return (
            <tr key={sector.id}>
              <td className="text-center" style={{ width: '20%' }}>
                {sector.id.substring(0, 7)}
              </td>
              <td>{sector.name}</td>

              <td className="text-center" style={{ width: '20%' }}>
                <Button
                  variant="dark"
                  size="sm"
                  onClick={() => handleEdit(sector.id)}
                >
                  <i className="bi bi-pencil-square"></i>
                </Button>{' '}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(sector.id)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}
