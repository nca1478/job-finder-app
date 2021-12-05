export const OfferPage = () => {
  return (
    <div className="container">
      <div className="row py-5">
        <div className="col">
          {/* Offer Img */}
          <img
            src="https://picsum.photos/id/119/520/320"
            alt=""
            className="img-fluid img-thumbnail"
          />
        </div>
        <div className="col">
          {/* Title */}
          <h2 class="mb-2">Title Job Offer</h2>

          {/* Description */}
          <h5>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor,
            repudiandae?
          </h5>

          <div className="row">
            <ul class="list-group list-group-flush lead">
              <li class="list-group-item">
                <div className="row">
                  {/* Username */}
                  <div className="col-9">
                    <span class="fw-bold">Freelancer:</span> Nelson Jose Cadenas
                    Araque
                  </div>
                  <div className="col-3 text-end">
                    <button class="btn btn-primary">Contact Info</button>
                  </div>
                </div>
              </li>

              {/* Country */}
              <li class="list-group-item">
                <span class="fw-bold">Country:</span> Venezuela
              </li>

              {/* State */}
              <li class="list-group-item">
                <span class="fw-bold">State:</span> Táchira
              </li>

              {/* City */}
              <li class="list-group-item">
                <span class="fw-bold">City:</span> San Juan de Colón
              </li>

              {/* Experience */}
              <li class="list-group-item">
                <span class="fw-bold">Experience:</span> Lorem, ipsum dolor sit
                amet consectetur adipisicing elit. Ab quia expedita, at non
                error dolore consequuntur quidem laborum dignissimos ducimus
                hic, quam nobis eveniet eaque ipsam quos mollitia minus ea?
              </li>

              {/* Contract */}
              <li class="list-group-item">
                <span class="fw-bold">Contract:</span> Indefinite, Full Time
              </li>

              {/* Salary */}
              <li class="list-group-item">
                <span class="fw-bold">Salary:</span> 10$
              </li>

              {/* Period */}
              <li class="list-group-item">
                <span class="fw-bold">Period:</span> Hours
              </li>

              {/* Currency */}
              <li class="list-group-item">
                <span class="fw-bold">Currency:</span> US Dolar
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
