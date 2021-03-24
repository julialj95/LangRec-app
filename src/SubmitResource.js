import React from "react";

function SubmitResource() {
  return (
    <div>
      <h2>Submit a Resource</h2>
      <h3>
        Have you found success using a certain resource? Share it here to help
        others on their learning journey!
      </h3>
      <form>
        <label>
          Resource Language
          <select>
            <option value={null}>Select language...</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Korean">Korean</option>
            <option value="Mandarin">Mandarin</option>
            <option value="Italian">Italian</option>
            <option value="Cantonese">Cantonese</option>
            <option value="Japanese">Japanese</option>
            <option value="Swahili">Swahili</option>
            <option value="Afrikaans">Afrikaans</option>
            <option value="other">Other</option>
          </select>
        </label>
        <br />
        <label>
          Resource type
          <select>
            <option value={null}>Select type...</option>
            <option value="textbook">Textbook</option>
            <option value="storybook">Storybook</option>
            <option value="website">Website</option>
            <option value="class">Class</option>
            <option value="other">Other</option>
          </select>
        </label>
        <br />
        <label htmlFor="link">
          Link
          <input type="text" name="link" />
        </label>
        <br />
        <label>
          Cost
          <br />
          <input type="radio" name="cost" value="Free" />
          <label htmlFor="cost">Free</label>
          <br />
          <input type="radio" name="cost" value="Paid" />
          <label htmlFor="cost">Paid</label>
          <br />
        </label>
        <br />

        <label>
          Rating
          <select>
            <option value={5}>5</option>
            <option value={4}>4</option>
            <option value={3}>3</option>
            <option value={2}>2</option>
            <option value={1}>1</option>
          </select>
        </label>
        <br />

        <label htmlFor="description">
          Description
          <br />
          <textarea
            name="description"
            placeholder="What should other users know about this resource?"
          />
        </label>
        <br />

        <button type="submit">Submit Resource</button>
      </form>
    </div>
  );
}
export default SubmitResource;
