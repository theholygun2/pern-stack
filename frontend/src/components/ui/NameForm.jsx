import { useState } from "react";

function NameForm() {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    console.log("Event object from input:", e);
    console.log("What you typed:", e.target.value);
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // stops page reload
    console.log("Form submitted with name:", name);
    alert(`Hello, ${name}!`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter your name:
        <input type="text" value={name} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default NameForm;