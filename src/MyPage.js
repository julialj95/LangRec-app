import React from "react";

function MyPage() {
  return (
    <div>
      <h2>My Saved Resources (Example)</h2>
      <h3>Title: En Espanol-Level 1</h3>
      <h4>Type: Textbook</h4>
      <h4>Level: Beginner</h4>
      <img
        src="https://img.thriftbooks.com/api/images/m/43b30bce375d76d7244b3605b9d1d59356832a09.jpg"
        alt="book cover"
        width="150px"
      />
      <h4>Average Rating: 4</h4>
      <br />
      <button>Remove resource from my page</button>
    </div>
  );
}

export default MyPage;
