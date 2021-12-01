import { Link } from 'react-router-dom'

export const LoginPage = () => {
  return (
    <section class="p-4 bg-light">
      <div class="container" style={{ width: '420px' }}>
        <div class="row text-center">
          <div class="col-md">
            <div class="card text-dark py-3">
              <div class="card-body text-center">
                <div class="h1 mb-3">
                  <i class="bi bi-person-circle"></i>
                </div>
                <h3 class="card-title mb-3">Login</h3>

                <form class="row needs-validation mx-1" novalidate>
                  {/* Username */}
                  <div class="input-group has-validation mb-3">
                    <span class="input-group-text" id="inputGroupPrepend">
                      <i class="bi bi-person-circle"></i>
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      id="username"
                      aria-describedby="inputGroupPrepend"
                      placeholder="Username"
                      required
                    />
                    <div class="invalid-feedback">Enter your username.</div>
                  </div>

                  {/* Password */}
                  <div class="input-group has-validation mb-3">
                    <span class="input-group-text" id="inputGroupPrepend2">
                      <i class="bi bi-key"></i>
                    </span>
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      aria-describedby="inputGroupPrepend2"
                      placeholder="Password"
                      required
                    />
                    <div class="invalid-feedback">Enter your password.</div>
                  </div>

                  {/* Local Login Button */}
                  <div class="d-grid gap-2 mb-3">
                    <button class="btn btn-dark" type="submit">
                      Login
                    </button>
                  </div>

                  <h5 class="card-title mb-3">Or</h5>

                  {/* Google Login Button */}
                  <div class="d-grid gap-2 mb-3">
                    <button class="btn btn-danger" type="button">
                      <i class="bi bi-google"></i> Login with Google
                    </button>
                  </div>

                  {/* Facebook Login Button */}
                  <div class="d-grid gap-2 mb-3">
                    <button class="btn btn-primary" type="button">
                      <i class="bi bi-facebook"></i> Login with Facebook
                    </button>
                  </div>

                  <span class="card-title">
                    Do you need an account?{' '}
                    <Link to="/register" style={{ textDecoration: 'none' }}>
                      Register
                    </Link>
                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
