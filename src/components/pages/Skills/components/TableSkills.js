// Dependencies
import { Table, Button } from 'react-bootstrap'

export const TableSkills = (props) => {
  const { skills, handleEdit, handleDelete } = props
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th className="text-center">Id</th>
          <th>Name</th>
          <th className="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {skills.map((skill) => {
          return (
            <tr key={skill.id}>
              <td className="text-center" style={{ width: '20%' }}>
                {skill.id.substring(0, 7)}
              </td>
              <td>{skill.name}</td>

              <td className="text-center" style={{ width: '20%' }}>
                <Button
                  variant="dark"
                  size="sm"
                  onClick={() => handleEdit(skill.id)}
                >
                  <i className="bi bi-pencil-square"></i>
                </Button>{' '}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(skill.id)}
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
