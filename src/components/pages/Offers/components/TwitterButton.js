export const TwitterButton = ({ user }) => {
  if (user) {
    return (
      <a
        className="btn btn-sm mx-1"
        style={{
          background: '#55ACEE',
          color: 'white',
          border: 'none',
        }}
        rel="noreferrer"
        target="_blank"
        href={`https://twitter.com/${user}/`}
      >
        <i className="bi bi-twitter"></i> Twitter
      </a>
    )
  } else {
    return null
  }
}
