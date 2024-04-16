<div className="paper-head-div">
<div className="table-start-container" style={{ width: "100%" }}>
  <div className="row">
    <div className="col">
      <div
        className=" table-ka-top-btns"
        style={{ marginTop: "1px" }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            handleOpen();
          }}
          id="add-btn"
          style={{ width: "max-content", marginTop: "20px" }}
        >
          <div className="add">
            <MdAdd />
            ADD STRENGTH
          </div>
        </Button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Strength</th>
            <th>Note</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Data 1</td>
            <td>Data 2</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
    <div className="col">
      <div
        className=" table-ka-top-btns"
        style={{ marginTop: "1px" }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            handleOpen();
          }}
          id="add-btn"
          style={{ width: "max-content", marginTop: "20px" }}
        >
          <div className="add">
            <MdAdd />
            ADD WEAKNESS
          </div>
        </Button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Weakness</th>
            <th>Note</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Data 1</td>
            <td>Data 2</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  </div>
  <div className="row">
    <div className="col">
      <div className=" table-ka-top-btns">
        <Button
          variant="outlined"
          onClick={() => {
            handleOpen();
          }}
          id="add-btn"
          style={{ width: "max-content", marginTop: "20px" }}
        >
          <div className="add">
            <MdAdd />
            ADD OPPORTUNITIES
          </div>
        </Button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th></th>
            <th>Note</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Data 1</td>
            <td>Data 2</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
    <div className="col">
      <div className=" table-ka-top-btns">
        <Button
          variant="outlined"
          onClick={() => {
            handleOpen();
          }}
          id="add-btn"
          style={{ width: "max-content", marginTop: "20px" }}
        >
          <div className="add">
            <MdAdd />
            ADD THREAT
          </div>
        </Button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th></th>
            <th>Note</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Data 1</td>
            <td>Data 2</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  </div>
</div>
<div>
  <Dialog className="mt-3" open={open} onClose={handleClose}>
    <DialogTitle id="form-header-popup">Add Analysis</DialogTitle>
    <DialogContent>
      <form style={{ width: "100%" }}>
        <div className="data-input-fields">
          <TextField
            id="name"
            margin="dense"
            label="Name"
            fullWidth
            value={formData.name}
            onChange={(e) => handleInputChange(e)}
            name="name"
          />
        </div>
        <div className="data-input-fields">
          <TextField
            id="note"
            margin="dense"
            label="Note"
            fullWidth
            value={formData.note}
            onChange={(e) => handleInputChange(e)}
            name="note"
          />
        </div>

        <div className="data-buttons d-flex justify-content-end">
          <Button
            id="input-btn-submit"
            className="submit"
            type="submit"
            // onClick={()}
            variant="outlined"
            style={{ width: "max-content", height: "40px" }}
          >
            Submit
          </Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</div>
</div>