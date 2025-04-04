import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  BarChart3, 
  Users, 
  Code, 
  Check, 
  Clock, 
  Headphones,
  Globe,
  Shield,
  Zap
} from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: 'Chat thời gian thực',
    description: 'Tương tác với khách hàng của bạn trong thời gian thực với giao diện trò chuyện trực quan và dễ sử dụng.',
  },
  {
    icon: BarChart3,
    title: 'Phân tích chi tiết',
    description: 'Hiểu rõ khách hàng của bạn với các báo cáo phân tích chi tiết và thông tin chi tiết về hành vi người dùng.',
  },
  {
    icon: Users,
    title: 'Quản lý khách hàng',
    description: 'Quản lý tất cả khách hàng và cuộc trò chuyện từ một bảng điều khiển trung tâm duy nhất.',
  },
  {
    icon: Code,
    title: 'Tích hợp linh hoạt',
    description: 'Dễ dàng tích hợp với trang web, ứng dụng di động hoặc hệ thống CRM hiện có của bạn.',
  },
  {
    icon: Headphones,
    title: 'Hỗ trợ 24/7',
    description: 'Cung cấp hỗ trợ 24/7 cho khách hàng của bạn với công cụ hỗ trợ và chatbot được hỗ trợ bởi AI.',
  },
  {
    icon: Shield,
    title: 'Bảo mật tối ưu',
    description: 'Dữ liệu của bạn luôn an toàn với mã hóa đầu cuối và các biện pháp bảo mật tiên tiến.',
  },
];

const steps = [
  {
    number: 1,
    title: 'Đăng ký',
    description: 'Tạo tài khoản miễn phí trong vài phút để bắt đầu.',
  },
  {
    number: 2,
    title: 'Tùy chỉnh',
    description: 'Tùy chỉnh giao diện trò chuyện để phù hợp với thương hiệu của bạn.',
  },
  {
    number: 3,
    title: 'Tích hợp',
    description: 'Thêm đoạn mã vào trang web của bạn hoặc tích hợp với ứng dụng.',
  },
  {
    number: 4,
    title: 'Bắt đầu trò chuyện',
    description: 'Bắt đầu trò chuyện với khách hàng và phát triển doanh nghiệp.',
  },
];

const pricingPlans = [
  {
    name: 'Cơ bản',
    price: '299k',
    description: 'Lý tưởng cho doanh nghiệp nhỏ mới bắt đầu.',
    features: [
      '500 tin nhắn/tháng',
      '2 tài khoản người dùng',
      'Hỗ trợ email',
      'Phân tích cơ bản',
    ],
    link: '/register?plan=basic',
  },
  {
    name: 'Chuyên nghiệp',
    price: '599k',
    description: 'Dành cho doanh nghiệp đang phát triển.',
    features: [
      '2,000 tin nhắn/tháng',
      '5 tài khoản người dùng',
      'Hỗ trợ ưu tiên',
      'Phân tích nâng cao',
      'Tích hợp AI chatbot',
    ],
    link: '/register?plan=pro',
    popular: true,
  },
  {
    name: 'Doanh nghiệp',
    price: 'Liên hệ',
    description: 'Giải pháp tùy chỉnh cho doanh nghiệp lớn.',
    features: [
      'Không giới hạn tin nhắn',
      'Không giới hạn người dùng',
      'Quản lý tài khoản chuyên dụng',
      'API tùy chỉnh',
      'Tích hợp nâng cao',
    ],
    link: '/contact',
  },
];

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Nền tảng trò chuyện trực tuyến thông minh cho doanh nghiệp
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Tăng tương tác với khách hàng, tiết kiệm thời gian và nâng cao hiệu quả kinh doanh với nền tảng AI hỗ trợ trò chuyện của chúng tôi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/register" 
                  className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md font-medium text-center transition-colors"
                >
                  Dùng thử miễn phí
                </Link>
                <Link 
                  to="/login" 
                  className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium text-center transition-colors"
                >
                  Đăng nhập
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-4 rounded-lg shadow-xl">
                <img 
                  src="/placeholder.svg" 
                  alt="Chat Platform Demo" 
                  className="w-full rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Giải pháp chat toàn diện
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chúng tôi cung cấp một nền tảng mạnh mẽ giúp doanh nghiệp của bạn giao tiếp hiệu quả với khách hàng
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg p-6 shadow-md transition-transform hover:translate-y-[-5px]">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Chat thời gian thực</h3>
              <p className="text-gray-600">
                Tương tác với khách hàng của bạn trong thời gian thực với giao diện trò chuyện trực quan và dễ sử dụng.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-lg p-6 shadow-md transition-transform hover:translate-y-[-5px]">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Phân tích chi tiết</h3>
              <p className="text-gray-600">
                Hiểu rõ khách hàng của bạn với các báo cáo phân tích chi tiết và thông tin chi tiết về hành vi người dùng.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-lg p-6 shadow-md transition-transform hover:translate-y-[-5px]">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Quản lý khách hàng</h3>
              <p className="text-gray-600">
                Quản lý tất cả khách hàng và cuộc trò chuyện từ một bảng điều khiển trung tâm duy nhất.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white rounded-lg p-6 shadow-md transition-transform hover:translate-y-[-5px]">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Tích hợp linh hoạt</h3>
              <p className="text-gray-600">
                Dễ dàng tích hợp với trang web, ứng dụng di động hoặc hệ thống CRM hiện có của bạn.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white rounded-lg p-6 shadow-md transition-transform hover:translate-y-[-5px]">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Headphones className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Hỗ trợ 24/7</h3>
              <p className="text-gray-600">
                Cung cấp hỗ trợ 24/7 cho khách hàng của bạn với công cụ hỗ trợ và chatbot được hỗ trợ bởi AI.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white rounded-lg p-6 shadow-md transition-transform hover:translate-y-[-5px]">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Bảo mật tối ưu</h3>
              <p className="text-gray-600">
                Dữ liệu của bạn luôn an toàn với mã hóa đầu cuối và các biện pháp bảo mật tiên tiến.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Cách thức hoạt động
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chỉ với vài bước đơn giản, bạn có thể bắt đầu tăng cường giao tiếp với khách hàng của mình
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Step 1 */}
            <div className="flex-1 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Đăng ký</h3>
              <p className="text-gray-600">
                Tạo tài khoản miễn phí trong vài phút để bắt đầu.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="flex-1 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Tùy chỉnh</h3>
              <p className="text-gray-600">
                Tùy chỉnh giao diện trò chuyện để phù hợp với thương hiệu của bạn.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="flex-1 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Tích hợp</h3>
              <p className="text-gray-600">
                Thêm đoạn mã vào trang web của bạn hoặc tích hợp với ứng dụng.
              </p>
            </div>
            
            {/* Step 4 */}
            <div className="flex-1 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Bắt đầu trò chuyện</h3>
              <p className="text-gray-600">
                Bắt đầu trò chuyện với khách hàng và phát triển doanh nghiệp.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Gói dịch vụ phù hợp cho mọi nhu cầu
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chọn gói phù hợp với quy mô và nhu cầu doanh nghiệp của bạn
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Cơ bản</h3>
                <div className="text-3xl font-bold text-gray-900 mb-4">
                  299k <span className="text-base font-normal text-gray-600">/tháng</span>
                </div>
                <p className="text-gray-600 mb-6">
                  Lý tưởng cho doanh nghiệp nhỏ mới bắt đầu.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>500 tin nhắn/tháng</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>2 tài khoản người dùng</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>Hỗ trợ email</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>Phân tích cơ bản</span>
                  </li>
                </ul>
                <Link 
                  to="/register?plan=basic" 
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  Bắt đầu
                </Link>
              </div>
            </div>
            
            {/* Pro Plan */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-blue-500 transform scale-105">
              <div className="bg-blue-500 text-white text-center py-2 text-sm font-medium">
                PHỔ BIẾN NHẤT
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Chuyên nghiệp</h3>
                <div className="text-3xl font-bold text-gray-900 mb-4">
                  599k <span className="text-base font-normal text-gray-600">/tháng</span>
                </div>
                <p className="text-gray-600 mb-6">
                  Dành cho doanh nghiệp đang phát triển.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>2,000 tin nhắn/tháng</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>5 tài khoản người dùng</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>Hỗ trợ ưu tiên</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>Phân tích nâng cao</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>Tích hợp AI chatbot</span>
                  </li>
                </ul>
                <Link 
                  to="/register?plan=pro" 
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  Bắt đầu
                </Link>
              </div>
            </div>
            
            {/* Enterprise Plan */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Doanh nghiệp</h3>
                <div className="text-3xl font-bold text-gray-900 mb-4">
                  Liên hệ <span className="text-base font-normal text-gray-600">để báo giá</span>
                </div>
                <p className="text-gray-600 mb-6">
                  Giải pháp tùy chỉnh cho doanh nghiệp lớn.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>Không giới hạn tin nhắn</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>Không giới hạn người dùng</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>Quản lý tài khoản chuyên dụng</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>API tùy chỉnh</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span>Tích hợp nâng cao</span>
                  </li>
                </ul>
                <Link 
                  to="/contact" 
                  className="block w-full bg-gray-800 text-white text-center py-3 rounded-md font-medium hover:bg-gray-900 transition-colors"
                >
                  Liên hệ với chúng tôi
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-lg font-bold mb-4">ChatApp</h3>
              <p className="text-gray-400 mb-4">
                Nền tảng trò chuyện trực tuyến thông minh giúp doanh nghiệp kết nối với khách hàng hiệu quả hơn.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">Liên kết nhanh</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Trang chủ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tính năng</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Bảng giá</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Về chúng tôi</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Liên hệ</a></li>
              </ul>
            </div>
            
            {/* Legal */}
            <div>
              <h3 className="text-lg font-bold mb-4">Pháp lý</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Điều khoản sử dụng</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Chính sách bảo mật</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold mb-4">Liên hệ</h3>
              <address className="text-gray-400 not-italic">
                <p>123 Đường Nguyễn Huệ</p>
                <p>Quận 1, TP. Hồ Chí Minh</p>
                <p>Việt Nam</p>
                <p className="mt-2">Email: info@chatapp.vn</p>
                <p>Phone: (84) 28 1234 5678</p>
              </address>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 ChatApp. Tất cả các quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
