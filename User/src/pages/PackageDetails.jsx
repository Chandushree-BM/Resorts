import { useParams, Link } from "react-router-dom";

export default function PackageDetails() {
  const { id } = useParams();
  
  return (
    <div className="pt-28 min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Details for Package: {id}</h1>
      <Link to="/packages" className="px-4 py-2 bg-indigo-600 text-white rounded">
        Back to Packages
      </Link>
    </div>
  );
}
