const { useEffect, useState } = require("react");
const supabase = require("../utils/supabase");

function Chat() {
  const [messages, setMessage] = useState([]);
  const [content, setContent] = useState("");
  let messageMarkup = messages.map(function (message) {
    return (
      <div>
        <p>{message.content}</p>
        <p>Written by {message.email}</p>
      </div>
    );
  });

  function getAllMessages() {
    supabase
      .from("messages")
      .select("*")
      .order("id", { ascending: false })
      .then(function (data) {
        setMessage(data.body);
      });
  }

  useEffect(function () {
    getAllMessages();
    setInterval(function () {
      getAllMessages();
    }, 1000);
  }, []);

  function handleSubmit(event) {
    // save the message to the database
    event.preventDefault;
    supabase
      .from("messages")
      .insert({ content: content, email: "temporary" })
      .then(function (data) {
        console.log(data);
      });
    console.log("The form was submitted");
  }

  function handleChange(event) {
    setContent(event.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Message"
          value={content}
          onChange={handleChange}
        />
        <input type="submit" value="send" />
      </form>
      <h3>All Messages</h3>
      {messageMarkup}
    </div>
  );
}

module.exports = Chat;
