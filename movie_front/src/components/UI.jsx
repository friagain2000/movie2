import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";

// 1. Button 컴포넌트 (Link와 button을 모두 처리)
export function Button({
  to,
  variant = "primary",
  className = "",
  children,
  disabled = false,
  ...props
}) {
  const getVariantStyle = (v) => {
    switch(v) {
      case "danger":
        return { backgroundColor: "#dc2626", color: "white" };
      case "ghost":
        return { color: "white", backgroundColor: "transparent", border: "none" };
      case "secondary":
        return { backgroundColor: "#1f2937", color: "white" };
      case "primary":
      default:
        return { backgroundColor: "#facc15", color: "black" };
    }
  };

  const baseStyle = {
    display: "inline-block",
    padding: "12px 32px",
    borderRadius: "8px",
    fontWeight: "bold",
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.3s ease",
    textDecoration: "none",
    opacity: disabled ? 0.5 : 1,
    ...getVariantStyle(variant),
  };

  const fullClassName = `btn btn-${variant} ${className}`;

  // 만약 to 속성이 있다면 Link(a태그)로 렌더링
  if (to) {
    return (
      <Link to={to} className={fullClassName} style={baseStyle} {...props}>
        {children}
      </Link>
    );
  }

  // to 속성이 없다면 일반 button으로 렌더링
  return (
    <button className={fullClassName} style={baseStyle} disabled={disabled} {...props}>
      {children}
    </button>
  );
}

// 2. Spinner 컴포넌트
export function Spinner({
  message = "불러오는 중...",
  full = false,
  className = "",
}) {
  if (full) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <p className="text-white text-2xl animate-pulse">{message}</p>
      </div>
    );
  }
  return <p className={`text-white text-xl ${className}`}>{message}</p>;
}

// 3. Modal 컴포넌트
export function Modal({ onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <div className="relative">
        {/* 내부에서 만든 Button 컴포넌트 활용 */}
        <Button
          variant="ghost"
          onClick={onClose}
          className="absolute -top-12 right-0 text-xl"
        >
          <FontAwesomeIcon icon={faXmark} />
        </Button>
        {children}
      </div>
    </div>
  );
}

// 4. Container 컴포넌트
export function Container({ className = "", children }) {
  return (
    <div className={`container mx-auto ${className}`}>{children}</div>
  );
}