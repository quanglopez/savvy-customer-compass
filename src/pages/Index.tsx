
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  MessageSquare,
  BarChart3,
  Users,
  Shield,
  Globe,
  Zap,
  ArrowRight,
  Check,
  ChevronRight,
} from "lucide-react";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const features = [
  {
    icon: <MessageSquare className="h-6 w-6 text-blue-500" />,
    title: "Chat thời gian thực",
    description: "Trải nghiệm trò chuyện mượt mà với khách hàng trong thời gian thực, hỗ trợ tệp đính kèm và emoji."
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-blue-500" />,
    title: "Phân tích dữ liệu",
    description: "Nắm bắt xu hướng khách hàng với biểu đồ trực quan và báo cáo chi tiết."
  },
  {
    icon: <Users className="h-6 w-6 text-blue-500" />,
    title: "Quản lý khách hàng",
    description: "Hệ thống CRM tích hợp giúp quản lý và phân loại khách hàng hiệu quả."
  },
  {
    icon: <Shield className="h-6 w-6 text-blue-500" />,
    title: "Bảo mật cao cấp",
    description: "Mã hóa end-to-end và xác thực đa yếu tố bảo vệ dữ liệu trò chuyện."
  },
  {
    icon: <Globe className="h-6 w-6 text-blue-500" />,
    title: "Đa nền tảng",
    description: "Hoạt động mượt mà trên mọi thiết bị - từ máy tính đến điện thoại di động."
  },
  {
    icon: <Zap className="h-6 w-6 text-blue-500" />,
    title: "AI tích hợp",
    description: "Chatbot AI thông minh giúp tự động hóa hỗ trợ khách hàng 24/7."
  }
];

const testimonials = [
  {
    content: "Savvy Customer Compass đã giúp chúng tôi tăng 35% tỷ lệ chuyển đổi khách hàng nhờ khả năng phản hồi nhanh chóng và phân tích dữ liệu chuyên sâu.",
    author: "Nguyễn Minh Tú",
    role: "Giám đốc Marketing, Tech Solutions"
  },
  {
    content: "Hệ thống phân tích của nền tảng này đã cho chúng tôi những insight quý giá về hành vi khách hàng, giúp tối ưu chiến lược bán hàng.",
    author: "Trần Hải Đăng",
    role: "CEO, Retail Connect"
  },
  {
    content: "Việc tích hợp AI chatbot đã giúp chúng tôi tiết kiệm 40% chi phí vận hành mà vẫn đảm bảo chất lượng dịch vụ khách hàng 24/7.",
    author: "Lê Minh Anh",
    role: "COO, E-Commerce Pro"
  }
];

const pricingPlans = [
  {
    name: "Starter",
    price: "299K",
    description: "Lý tưởng cho doanh nghiệp nhỏ",
    features: [
      "500 tin nhắn/tháng",
      "2 tài khoản quản trị",
      "Phân tích cơ bản",
      "Hỗ trợ email"
    ],
    popular: false
  },
  {
    name: "Professional",
    price: "599K",
    description: "Cho doanh nghiệp đang phát triển",
    features: [
      "2000 tin nhắn/tháng",
      "5 tài khoản quản trị",
      "Phân tích chuyên sâu",
      "Hỗ trợ ưu tiên 24/5",
      "Tích hợp AI chatbot"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "Contact us",
    description: "Giải pháp tùy chỉnh cho tập đoàn lớn",
    features: [
      "Không giới hạn tin nhắn",
      "Không giới hạn người dùng",
      "API tùy chỉnh",
      "Hỗ trợ 24/7 ưu tiên cao",
      "Triển khai theo yêu cầu",
      "Quản lý tài khoản chuyên biệt"
    ],
    popular: false
  }
];

export function Index() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Redirect if user is already authenticated
  useEffect(() => {
    if (!loading && user) {
      if (user.role === 'business') {
        navigate("/dashboard");
      } else {
        navigate("/chat");
      }
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navbar */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-white shadow-md"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center">
            <div className="rounded-full bg-blue-500 p-2 mr-2">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Savvy Customer Compass
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
              Tính năng
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">
              Đánh giá
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">
              Báo giá
            </a>
          </nav>

          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost"
              onClick={() => navigate("/login")}
              className="hidden sm:inline-flex"
            >
              Đăng nhập
            </Button>
            <Button 
              onClick={() => navigate("/register")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-all"
            >
              Dùng thử miễn phí
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="flex flex-col lg:flex-row items-center gap-12"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="lg:w-1/2 text-center lg:text-left">
              <motion.div 
                className="inline-block mb-4 px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-medium"
                whileHover={{ scale: 1.05 }}
              >
                #1 Customer Chat Platform in Vietnam
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-purple-600 to-blue-700 bg-clip-text text-transparent"
                variants={itemVariants}
              >
                Nâng tầm trải nghiệm <br className="hidden md:block" /> 
                khách hàng của bạn
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0"
                variants={itemVariants}
              >
                Nền tảng chat đa kênh tích hợp AI giúp doanh nghiệp tương tác với khách hàng 
                hiệu quả hơn, tăng tỷ lệ chuyển đổi và phát triển doanh thu.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                variants={itemVariants}
              >
                <Button 
                  size="lg" 
                  onClick={() => navigate("/register")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-6 rounded-xl text-lg hover:shadow-xl transition-all duration-300"
                >
                  Bắt đầu miễn phí
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate("/contact")}
                  className="px-8 py-6 rounded-xl text-lg border-gray-300"
                >
                  Demo sản phẩm
                </Button>
              </motion.div>
              
              <motion.div 
                className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-gray-500"
                variants={itemVariants}
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`w-8 h-8 rounded-full bg-blue-${i*100} border-2 border-white`}></div>
                  ))}
                </div>
                <span>1000+ doanh nghiệp đang sử dụng</span>
              </motion.div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="lg:w-1/2 bg-white p-2 sm:p-4 rounded-2xl shadow-2xl"
            >
              <div className="bg-gray-50 rounded-xl overflow-hidden aspect-[4/3] border relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50"></div>
                <img 
                  src="/placeholder.svg" 
                  alt="Platform Dashboard Preview" 
                  className="w-full h-full object-cover mix-blend-overlay"
                />
                {/* UI Elements overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 w-3/4 h-3/4">
                    <div className="h-1/6 border-b flex items-center px-4">
                      <div className="h-3 w-3 rounded-full bg-red-400 mr-2"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-400 mr-2"></div>
                      <div className="h-3 w-3 rounded-full bg-green-400 mr-2"></div>
                    </div>
                    <div className="h-5/6 flex">
                      <div className="w-1/4 border-r p-4">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="h-8 bg-gray-200 rounded mb-2 animate-pulse"></div>
                        ))}
                      </div>
                      <div className="w-3/4 p-4">
                        <div className="h-4/5 overflow-y-auto">
                          {[1, 2, 3, 4].map(i => (
                            <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'} mb-4`}>
                              <div 
                                className={`rounded-lg p-3 max-w-[80%] 
                                  ${i % 2 === 0 ? 'bg-gray-200' : 'bg-blue-500 text-white'}
                                `}
                              >
                                <div className="h-2 w-24 bg-current opacity-30 rounded mb-1"></div>
                                <div className="h-2 w-32 bg-current opacity-30 rounded"></div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="h-1/5 pt-2">
                          <div className="bg-gray-100 rounded-full h-10 flex items-center px-4">
                            <div className="h-2 w-full bg-gray-300 rounded"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="text-4xl font-bold text-blue-600 mb-2">1000+</h3>
              <p className="text-gray-600">Doanh nghiệp</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-blue-600 mb-2">5M+</h3>
              <p className="text-gray-600">Tin nhắn mỗi tháng</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-blue-600 mb-2">35%</h3>
              <p className="text-gray-600">Tăng chuyển đổi</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-blue-600 mb-2">24/7</h3>
              <p className="text-gray-600">Hỗ trợ khách hàng</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tính năng nổi bật</h2>
            <p className="text-xl text-gray-600">
              Khám phá các tính năng hiện đại giúp doanh nghiệp của bạn tương tác với khách hàng hiệu quả hơn
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Khách hàng nói gì về chúng tôi</h2>
            <p className="text-xl text-gray-600">
              Hàng ngàn doanh nghiệp đã chuyển đổi và phát triển cùng Savvy Customer Compass
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-semibold">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Bảng giá linh hoạt</h2>
            <p className="text-xl text-gray-600">
              Lựa chọn giải pháp phù hợp với quy mô và nhu cầu của doanh nghiệp bạn
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                className={`rounded-2xl overflow-hidden ${
                  plan.popular
                    ? "border-2 border-blue-500 shadow-xl scale-105 relative z-10"
                    : "border border-gray-200 shadow-lg"
                } bg-white`}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                {plan.popular && (
                  <div className="bg-blue-500 text-white text-center py-2 font-medium">
                    PHỔ BIẾN NHẤT
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3">{plan.name}</h3>
                  <div className="flex items-end mb-5">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Contact us" && <span className="text-gray-500 ml-1">/tháng</span>}
                  </div>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <ul className="mb-8 space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    className={`w-full py-6 text-lg ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg"
                        : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-50"
                    }`}
                    onClick={() => navigate("/register")}
                  >
                    {plan.price === "Contact us" ? "Liên hệ ngay" : "Đăng ký ngay"}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Sẵn sàng nâng cao trải nghiệm khách hàng của bạn?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Tham gia cùng hơn 1000+ doanh nghiệp đang sử dụng Savvy Customer Compass để phát triển
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg rounded-xl"
              onClick={() => navigate("/register")}
            >
              Bắt đầu miễn phí
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl"
              onClick={() => navigate("/contact")}
            >
              Đặt lịch demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4 flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-blue-500" />
                Savvy Customer Compass
              </h3>
              <p className="mb-4">Nền tảng chat thông minh giúp doanh nghiệp tương tác với khách hàng hiệu quả hơn.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.232 8.232 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Sản phẩm</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Tính năng</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Giá cả</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tích hợp</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Hỗ trợ</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Trung tâm hỗ trợ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tài liệu</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cộng đồng</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Công ty</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Về chúng tôi</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tuyển dụng</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Liên hệ</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 Savvy Customer Compass. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a>
              <a href="#" className="hover:text-white transition-colors">Điều khoản sử dụng</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index;
