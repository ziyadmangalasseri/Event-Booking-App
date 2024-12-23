import LoginForm from "./LoginForm";
import PageBackground from "./PageBackground";
const Body = () => {
    return(
        <div>
        <PageBackground />
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-black bg-opacity-30 rounded-lg shadow-md text-white font-mono w-96">
            <div className="p-8 text-center">
              <img
                src="/images/ALFA_EVENT_LOGO1.png"
                alt="ALFA Event Logo"
                className="w-24 mx-auto"
              />
            </div>
            <div className="p-8 bg-black bg-opacity-20 rounded-b-lg">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    )
}

export default Body;