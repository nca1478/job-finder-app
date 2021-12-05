export const EditUserPage = () => {
  return (
    <div className="p-4 bg-light">
      <div className="container w-50">
        <h2 class="mb-2 text-center">User Profile</h2>
        <div className="card mt-3">
          <div className="card-body">
            <form>
              {/* User Image */}
              {/* <div className="mb-3 text-center">
                <img
                  src="https://randomuser.me/api/portraits/men/11.jpg"
                  class="rounded-circle"
                  alt=""
                />
              </div> */}

              {/* Name */}
              <div className="mb-3">
                <label for="name" className="form-label">
                  Name
                </label>
                <input type="text" className="form-control" id="name" />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label for="email" className="form-label">
                  Email
                </label>
                <input type="text" className="form-control" id="email" />
              </div>

              {/* Profession */}
              <div className="mb-3">
                <label for="profession" className="form-label">
                  Profession
                </label>
                <input type="text" className="form-control" id="profession" />
              </div>

              {/* Birthday */}
              <div className="mb-3">
                <label for="birthday" className="form-label">
                  Birthday
                </label>
                <input type="text" className="form-control" id="birthday" />
              </div>

              {/* Education */}
              <div className="mb-3">
                <label for="education" className="form-label">
                  Education
                </label>
                <input type="text" className="form-control" id="education" />
              </div>

              {/* CV */}
              <div className="mb-3">
                <label for="cv" className="form-label">
                  Curriculum Vitae
                </label>
                <input type="text" className="form-control" id="cv" />
              </div>

              {/* Photography */}
              <div className="row">
                <label for="image" class="form-label">
                  Photography
                </label>
                <div className="input-group mb-3">
                  <input type="file" className="form-control" id="image" />
                  <label className="input-group-text" for="image">
                    Upload
                  </label>
                </div>
              </div>

              <div className="d-grid gap-2">
                <button className="btn btn-primary" type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
