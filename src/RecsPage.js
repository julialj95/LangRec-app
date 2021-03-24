import React from "react";

function RecsPage() {
  return (
    <div>
      <h2>Get Reccomendations</h2>
      <h3>
        Enter your information to receive the highest rated resources that fit
        your needs!
      </h3>
      <form>
        <label htmlFor="language">
          Language
          <select name="language">
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
        <label htmlFor="type">
          Resource Type
          <select name="type">
            <option value={null}>Select Type...</option>
            <option value="textbook">Textbook</option>
            <option value="storybook">Storybook</option>
            <option value="class">Class</option>
            <option value="website">Website</option>
            <option value="other">Other</option>
          </select>
        </label>
        <br />
        <br />
        <label>
          Level
          <br />
          <input type="radio" id="beginner" name="level" value="beginner" />
          <label for="beginner">Beginner</label>
          <br />
          <input
            type="radio"
            id="intermediate"
            name="level"
            value="intermediate"
          />
          <label for="intermediate">Intermediate</label>
          <br />
          <input type="radio" id="advanced" name="level" value="advanced" />
          <label for="advanced">Advanced</label>
        </label>
        <br />
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

        <button type="submit">Get Recs!</button>
      </form>
    </div>
  );
}

export default RecsPage;
