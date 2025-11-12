export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-red-600 mb-4">
        🚫 Truy cập bị từ chối
      </h1>
      <p className="text-gray-600">
        Bạn không có quyền truy cập vào trang này.
      </p>
      <a
        href="/dashboard"
        className="mt-4 text-blue-600 underline hover:text-blue-800 transition"
      >
        Quay về trang chủ
      </a>
    </div>
  );
}
