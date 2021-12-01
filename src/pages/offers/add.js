import React from 'react'

export const AddOfferPage = () => {
  return (
    <div className="bg-light p-4">
      <div className="container w-50">
        <h2 className="text-center">Add New Offer</h2>
        <div className="card mt-3">
          {/* <div className="card-header h5">Add New Offer</div> */}
          <div className="card-body">
            <form>
              {/* Title */}
              <div className="mb-3">
                <label for="title" className="form-label">
                  Title
                </label>
                <input type="text" className="form-control" id="title" />
              </div>

              {/* Description */}
              <div className="mb-3">
                <label for="description" className="form-label">
                  Description
                </label>
                <input type="text" className="form-control" id="description" />
              </div>

              <div className="row mb-3">
                {/* Country */}
                <div className="col-4">
                  <label for="country" className="form-label">
                    Country
                  </label>
                  <select
                    id="country"
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Open this select menu</option>
                    <option value="1">Country1</option>
                    <option value="2">Country2</option>
                    <option value="3">Country3</option>
                  </select>
                </div>

                {/* State */}
                <div className="col-4">
                  <label for="state" className="form-label">
                    State
                  </label>
                  <select
                    id="state"
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Open this select menu</option>
                    <option value="1">State1</option>
                    <option value="2">State2</option>
                    <option value="3">State3</option>
                  </select>
                </div>

                {/* City */}
                <div className="col-4">
                  <label for="city" className="form-label">
                    City
                  </label>
                  <select
                    id="city"
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Open this select menu</option>
                    <option value="1">City 1</option>
                    <option value="2">City 2</option>
                    <option value="3">city 3</option>
                  </select>
                </div>
              </div>

              {/* Experience */}
              <div className="mb-3">
                <label for="experience" className="form-label">
                  Experience
                </label>
                <textarea
                  className="form-control"
                  id="experience"
                  rows="3"
                ></textarea>
              </div>

              {/* Contract */}
              <div className="mb-3">
                <label for="contract" className="form-label">
                  Contract
                </label>
                <select
                  id="contract"
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option selected>Open this select menu</option>
                  <option value="1">Contract1</option>
                  <option value="2">Contract2</option>
                  <option value="3">Contract3</option>
                </select>
              </div>

              {/* payment / period / currency */}
              <div className="row mb-3">
                {/* Payment */}
                <div className="col-4">
                  <label for="payment" className="form-label">
                    Payment
                  </label>
                  <input type="text" className="form-control" id="payment" />
                </div>

                {/* Period */}
                <div className="col-4">
                  <label for="period" className="form-label">
                    Period
                  </label>
                  <select
                    id="period"
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Open this select menu</option>
                    <option value="1">Period 1</option>
                    <option value="2">Period 2</option>
                    <option value="3">Period 3</option>
                  </select>
                </div>

                {/* Currency */}
                <div className="col-4">
                  <label for="currency" className="form-label">
                    Currency
                  </label>
                  <select
                    id="currency"
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Open this select menu</option>
                    <option value="1">Currency 1</option>
                    <option value="2">Currency 2</option>
                    <option value="3">Currency 3</option>
                  </select>
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
