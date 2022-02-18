export const LinkedinButton = ({ user }) => {
  if (user) {
    return (
      <a
        className="btn btn-sm mx-1"
        style={{
          background: '#007bb5',
          color: 'white',
          border: 'none',
        }}
        rel="noreferrer"
        target="_blank"
        href={`https://www.linkedin.com/in/${user}/`}
      >
        <i className="bi bi-linkedin"></i> Linkedin
      </a>
    )
  } else {
    return null
  }
}
