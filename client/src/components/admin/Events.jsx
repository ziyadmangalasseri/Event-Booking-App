const Events = (events) => {

    const backbutton = () => {
        window.history.back()
    }
  return (
      <div>
        <div className="text-center py-4">
          <h3 className="text-2xl font-bold mb-2">Event List</h3>
        </div>

        <div className="bg-black/60 p-5 h-[470px] flex flex-col overflow-y-auto scrollbar-hide">
          {events?.length > 0 ? (
            events?.map((employee, index) => (
              <a
                key={employee._id}
                href={`/showEmployeeDetails/${employee._id}`}
                className="block mb-3"
              >
                <div className="flex justify-between items-center bg-white/10 rounded-lg p-4">
                  <div>
                    <h6 className="uppercase font-medium">
                      {index + 1}. {employee.name}
                    </h6>
                    <h6 className="text-sm">ID: {employee.userId}</h6>
                  </div>
                </div>
              </a>
            ))
          ) : (
            <p className="text-center">No events are available.</p>
          )}
        </div>

        <div className="flex justify-center p-4">
            <button className="w-1/2 h-10 bg-green-700 hover:bg-green-800 rounded-xl text-white"onClick={backbutton}>
              Home
            </button>
        </div>
      </div>
  );
};

export default Events;
