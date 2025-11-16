"use client";

import { GraduationCap, Mail, Phone, MapPin, Facebook, Youtube, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white mt-auto">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 - About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <GraduationCap size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Trường Cao đẳng Nghề</h3>
                <p className="text-xs text-gray-400">TP. Hồ Chí Minh</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Hệ thống quản lý đào tạo hiện đại, giúp sinh viên và giảng viên 
              theo dõi lịch học, lịch thi một cách dễ dàng và hiệu quả.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-blue-400">Liên kết nhanh</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/admission" className="text-gray-400 hover:text-white transition">
                  Tuyển sinh
                </Link>
              </li>
              <li>
                <Link href="/training" className="text-gray-400 hover:text-white transition">
                  Đào tạo
                </Link>
              </li>
              <li>
                <Link href="/research" className="text-gray-400 hover:text-white transition">
                  Nghiên cứu khoa học
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Support */}
          <div>
            <h4 className="font-bold mb-4 text-blue-400">Hỗ trợ</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-white transition">
                  Hướng dẫn sử dụng
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition">
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link href="/regulations" className="text-gray-400 hover:text-white transition">
                  Quy định - Quy chế
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition">
                  Liên hệ hỗ trợ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h4 className="font-bold mb-4 text-blue-400">Liên hệ</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>Quận 1, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone size={16} className="flex-shrink-0" />
                <span>(028) xxxx-xxxx</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail size={16} className="flex-shrink-0" />
                <span>info@tkb.edu.vn</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-4">
              <p className="text-xs text-gray-400 mb-2">Kết nối với chúng tôi</p>
              <div className="flex gap-2">
                <a
                  href="#"
                  className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 transition"
                  aria-label="Facebook"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href="#"
                  className="bg-red-600 p-2 rounded-lg hover:bg-red-700 transition"
                  aria-label="Youtube"
                >
                  <Youtube size={16} />
                </a>
                <a
                  href="#"
                  className="bg-blue-500 p-2 rounded-lg hover:bg-blue-600 transition"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>
              © {currentYear} Trường Cao đẳng Nghề TP.HCM - Phòng Quản lý Đào tạo. 
              <span className="hidden md:inline"> All rights reserved.</span>
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white transition">
                Chính sách bảo mật
              </Link>
              <Link href="/terms" className="hover:text-white transition">
                Điều khoản sử dụng
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Accessibility Note */}
      {/* <div className="bg-gray-950 py-2">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs text-gray-500">
            Phát triển bởi Phòng Công nghệ Thông tin | Phiên bản 1.0.0
          </p>
        </div>
      </div> */}
    </footer>
  );
}