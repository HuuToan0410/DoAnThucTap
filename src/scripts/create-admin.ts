import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/db";
import User from "@/models/User";

async function createAdmin() {
  await dbConnect();

  const existing = await User.findOne({ email: "admin@tkb.edu.vn" });
  if (existing) {
    console.log("✅ Admin đã tồn tại:", existing.email);
    return;
  }

  const hash = await bcrypt.hash("123456", 10);

  await User.create({
    name: "Admin",
    email: "admin@tkb.edu.vn",
    passwordHash: hash,
    role: "ADMIN",
  });

  console.log("🎉 Tạo thành công tài khoản ADMIN!");
}

createAdmin()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
