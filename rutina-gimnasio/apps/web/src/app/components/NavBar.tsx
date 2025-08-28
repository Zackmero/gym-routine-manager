'use client';

export default function NavBar({ user, onLogout }: { user: any, onLogout: () => void }) {

    return (
        <nav className="bg-gray-500 text-white px-4 py-3 flex justify-between item-center">
            <h1>Gym App Dashboard</h1>
            <div className="flex item-center gap-4">
                <span>{user?.name}</span>
                <button
                    onClick={onLogout}
                    className="bg-red-500 px-3 rounded hover:bg-red-700 transition"
                >
                    Logout
                </button>
            </div>
        </nav>
    );

}