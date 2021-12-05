import { Link } from 'react-router-dom'

export const RegisterPage = () => {
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
                <h3 class="card-title mb-3">Create an Account</h3>

                <form class="row needs-validation mx-1" novalidate>
                  {/* Fullname */}
                  <div class="input-group has-validation mb-3">
                    <span class="input-group-text" id="inputGroupPrepend">
                      <i class="bi bi-person-circle"></i>
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      id="name"
                      aria-describedby="inputGroupPrepend"
                      placeholder="Fullname"
                      required
                    />
                    <div class="invalid-feedback">Enter your username.</div>
                  </div>

                  {/* Email */}
                  <div class="input-group has-validation mb-3">
                    <span class="input-group-text" id="inputGroupPrepend">
                      <i class="bi bi-envelope"></i>
                    </span>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      aria-describedby="inputGroupPrepend"
                      placeholder="Email"
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

                  {/* Confirm Password */}
                  <div class="input-group has-validation mb-3">
                    <span class="input-group-text" id="inputGroupPrepend2">
                      <i class="bi bi-key"></i>
                    </span>
                    <input
                      type="password"
                      class="form-control"
                      id="confirm"
                      aria-describedby="inputGroupPrepend2"
                      placeholder="Confirm Password"
                      required
                    />
                    <div class="invalid-feedback">Enter your password.</div>
                  </div>

                  {/* Register Button */}
                  <div class="d-grid gap-2 mb-3">
                    <button class="btn btn-primary" type="submit">
                      Register
                    </button>
                  </div>

                  <span class="card-title">
                    Do you already have an account?{' '}
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                      Login
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
