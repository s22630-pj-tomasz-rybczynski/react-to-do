
export default function Register() {

    return (
        <main className="max-w-4xl mx-auto mt-4">
            <div className="text-center my-5 flex flex-col gap-4">
                <div className="relative flex flex-col justify-center h-screen overflow-hidden">
                    <div
                        className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
                        <h1 className="text-3xl font-semibold text-center text-gray-700">React ToDo list</h1>
                        <form className="space-y-4">
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Email</span>
                                </label>
                                <input type="text" placeholder="Email Address"
                                    className="w-full input input-bordered" />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-base label-text">Password</span>
                                </label>
                                <input type="password" placeholder="Enter Password"
                                    className="w-full input input-bordered" />
                            </div>
                            <div>
                                <button className="btn btn-block">Sign Up</button>
                            </div>
                            <span>Already have an account?
                                <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline"> Login</a></span>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
