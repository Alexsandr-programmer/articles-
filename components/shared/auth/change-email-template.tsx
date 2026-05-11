interface ChangeEmailTemplateProps {
  name: string;
  changeEmailUrl?: string;
  /** Shown when the auth callback provides the target address */
  newEmail?: string;
}

export function ChangeEmailTemplate({
  name,
  changeEmailUrl,
  newEmail,
}: ChangeEmailTemplateProps) {
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
              "linear-gradient(135deg, rgba(13,148,136,1) 0%, rgba(2,132,199,1) 100%)",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "12px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#ccfbf1",
            }}
          >
            First Project Articles
          </p>
          <h1
            style={{
              margin: "8px 0 0",
              fontSize: "26px",
              lineHeight: 1.25,
              color: "#ffffff",
            }}
          >
            Confirm your email change
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
              margin: "0 0 16px",
              fontSize: "15px",
              lineHeight: 1.6,
              color: "#4b5563",
            }}
          >
            We received a request to update the email address on your account.
            This message was sent to your <strong>current</strong> address so
            you can approve the change.
          </p>

          {newEmail ? (
            <div
              style={{
                margin: "0 0 20px",
                padding: "14px 16px",
                borderRadius: "10px",
                backgroundColor: "#f0fdfa",
                border: "1px solid #99f6e4",
              }}
            >
              <p
                style={{
                  margin: "0 0 6px",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "#0f766e",
                }}
              >
                New email
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#134e4a",
                  wordBreak: "break-all",
                }}
              >
                {newEmail}
              </p>
            </div>
          ) : null}

          <div
            style={{
              margin: "0 0 22px",
              padding: "16px 18px",
              borderRadius: "10px",
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
            }}
          >
            <p
              style={{
                margin: "0 0 10px",
                fontSize: "13px",
                fontWeight: 600,
                color: "#334155",
              }}
            >
              What happens next
            </p>
            <ol
              style={{
                margin: 0,
                paddingLeft: "18px",
                fontSize: "14px",
                lineHeight: 1.65,
                color: "#64748b",
              }}
            >
              <li style={{ marginBottom: "6px" }}>
                Tap the button below to confirm this change.
              </li>
              <li>
                After confirmation, sign in using your updated email address.
              </li>
            </ol>
          </div>

          {changeEmailUrl ? (
            <div style={{ margin: "0 0 18px" }}>
              <a
                href={changeEmailUrl}
                style={{
                  display: "inline-block",
                  padding: "12px 22px",
                  borderRadius: "10px",
                  backgroundColor: "#0d9488",
                  color: "#ffffff",
                  fontSize: "15px",
                  fontWeight: 600,
                  textDecoration: "none",
                  boxShadow: "0 4px 14px rgba(13, 148, 136, 0.35)",
                }}
              >
                Confirm email change
              </a>
            </div>
          ) : null}

          {changeEmailUrl ? (
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
              <a href={changeEmailUrl} style={{ color: "#0d9488" }}>
                {changeEmailUrl}
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
            If you did not request this change, ignore this email and your
            account will stay as it is. Never forward this link to anyone.
          </p>
        </div>
      </div>
    </div>
  );
}
