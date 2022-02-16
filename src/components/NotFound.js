import './NotFound.css';

export default function NotFound() {
  return (
    <div className = "error-Page">
      <div>
        <div className = "errorMessage">
          <div className = "first">
            <p>404</p>
          </div>
          <div className = "second">
            <p>This page could not be found.</p>
          </div>
        </div>
      </div>
    </div>
  )
}