export default function Home() {
  return (
    <div>

      <div className="button-group">
        <button className="pri-btn">Text</button>
        <button className="text-btn">Pdf</button>
        <button className="text-btn">Picture</button>
      </div>
      
      <form className="upload-form" >

        <h3 style={{textAlign: "center", marginTop: "20px"}}>Summary</h3>

        <label htmlFor="image">
          <h5>Upload image</h5>
          <input type="file" name="image" />
        </label>

        <label htmlFor="pdf">
          <h5>Upload pdf</h5>
          <input type="file" name="pdf" />
        </label>

        <label htmlFor="text">
          <h5>Enter text</h5>
          <textarea name="text"></textarea>
        </label>

     

        <select name="language" >
          <label htmlFor=""><h5>Select Language</h5></label>
          <option>Select Language</option>
          <option value="english">English</option>
          <option value="french">French</option>
          <option value="spain">Spain</option>
        </select>

        <select name="suammry" >
          <label htmlFor="summary"><h5>Select Summary</h5></label>
          <option >Select Summary</option>
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="detailed">Detailed</option>
        </select>

        <button className="pri-btn">Summarize</button>

      </form>
    </div>
  );
}
