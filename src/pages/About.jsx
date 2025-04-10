import Header from "../components/Header";

function About() {
  return (
    <>
    <Header/>
      <div className="w-screen h-[90%] flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full h-17 bg-indigo-900 absolute bottom-0"></div>
        <iframe
          src="https://gamma.app/embed/gvqs0xfor2x5yme"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
          allow="fullscreen"
          title="Vigil AI"
        />
      </div>
    </>
  );
}

export default About;
