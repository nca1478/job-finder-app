export const InstagramButton = ({ user }) => {
  if (user) {
    return (
      <a
        className="btn btn-sm mx-1"
        style={{
          background: '#125688',
          color: 'white',
          border: 'none',
        }}
        rel="noreferrer"
        target="_blank"
        href={`https://www.instagram.com/${user}/`}
      >
        <i className="bi bi-twitter"></i> Instagram
      </a>
    )
  } else {
    return null
  }
}
