export const FacebookButton = ({ user }) => {
  if (user) {
    return (
      <a
        className="btn btn-sm mx-1"
        style={{
          background: '#3B5998',
          color: 'white',
          border: 'none',
        }}
        rel="noreferrer"
        target="_blank"
        href={`https://www.facebook.com/${user}`}
      >
        <i className="bi bi-twitter"></i> Facebook
      </a>
    )
  } else {
    return null
  }
}
