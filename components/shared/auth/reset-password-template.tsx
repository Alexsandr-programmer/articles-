interface ResetPasswordTemplateProps {
  name: string;
  resetUrl?: string;
}

export function ResetPasswordTemplate({
  name,
  resetUrl,
}: ResetPasswordTemplateProps) {
  return (
    <div
      style={{
        margin: 0,
        padding: "24px 12px",
        backgroundColor: "#f3f4f6",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <div
        style={{
          margin: "0 auto",
          maxWidth: "560px",
          borderRadius: "14px",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
          boxShadow: "0 8px 28px rgba(15, 23, 42, 0.08)",
        }}
      >
        <div
          style={{
            padding: "24px",
            background:
              "linear-gradient(135deg, rgba(59,130,246,1) 0%, rgba(99,102,241,1) 100%)",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "12px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#dbeafe",
            }}
          >
            First Project Articles
          </p>
          <h1
            style={{
              margin: "8px 0 0",
              fontSize: "28px",
              lineHeight: 1.2,
              color: "#ffffff",
            }}
          >
            Reset your password
          </h1>
        </div>

        <div style={{ padding: "28px 24px" }}>
          <p
            style={{
              margin: "0 0 12px",
              fontSize: "16px",
              lineHeight: 1.6,
              color: "#111827",
            }}
          >
            Hi {name},
          </p>
          <p
            style={{
              margin: "0 0 12px",
              fontSize: "15px",
              lineHeight: 1.6,
              color: "#4b5563",
            }}
          >
            We received a request to reset the password for your account. Use
            the button below to choose a new password. This link is only valid
            for a limited time.
          </p>
          <p
            style={{
              margin: "0 0 20px",
              fontSize: "14px",
              lineHeight: 1.6,
              color: "#6b7280",
            }}
          >
            For your security, if you did not ask for a reset, you can ignore
            this email—your password will stay the same.
          </p>

          {resetUrl ? (
            <div style={{ margin: "0 0 18px" }}>
              <a
                href={resetUrl}
                style={{
                  display: "inline-block",
                  padding: "12px 20px",
                  borderRadius: "10px",
                  backgroundColor: "#2563eb",
                  color: "#ffffff",
                  fontSize: "15px",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Reset password
              </a>
            </div>
          ) : null}

          {resetUrl ? (
            <p
              style={{
                margin: 0,
                fontSize: "13px",
                lineHeight: 1.6,
                color: "#6b7280",
                wordBreak: "break-all",
              }}
            >
              If the button does not work, copy and paste this link into your
              browser:
              <br />
              <a href={resetUrl} style={{ color: "#2563eb" }}>
                {resetUrl}
              </a>
            </p>
          ) : null}
        </div>

        <div
          style={{
            borderTop: "1px solid #e5e7eb",
            padding: "16px 24px",
            backgroundColor: "#f9fafb",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "12px",
              lineHeight: 1.6,
              color: "#6b7280",
            }}
          >
            Never share this link with anyone. Our team will never ask you for
            your password or this reset link.
          </p>
        </div>
      </div>
    </div>
  );
}
