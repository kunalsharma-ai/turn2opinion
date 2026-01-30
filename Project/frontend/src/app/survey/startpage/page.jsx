export default function SurveyStart({
  survey = {
    name: "SURVEY NAME",
    category: "CATEGORY",
    points: "POINTS",
    time: "TIME",
    link:"#"
  }
  
}) {
  return (
    <div style={{ padding: "10px", background: "#ffffff" }}>
      <table width="100%" cellPadding="0" cellSpacing="0">
        <tbody>
          <tr>
            <td align="center">
              <img
                src="https://myhealthopinions.com/images/logo/logo-300w.png"
                alt="My Health Opinions"
                style={{ width: 320, height: "auto", margin: 0, padding: 0 }}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div
        style={{
          maxWidth: 600,
          margin: "auto",
          background: "#f8f8f8",
          border: "1px solid rgba(89, 172, 119, 0.3)",
          borderRadius: 6,
        }}
      >
        <div style={{ padding: "30px 20px" }}>
          <h2
            style={{
              textAlign: "center",
              color: "#2a3940",
              fontWeight: 600,
              margin: 0,
            }}
          >
            Start Your Survey
          </h2>

          <p
            style={{
              fontSize: 15,
              color: "#2a3940",
              textAlign: "center",
              margin: "10px 0",
              fontWeight: 500,
            }}
          >
            A new survey is available for you. Take a moment to review the
            details below, then proceed when you're ready.
          </p>

          <table
            width="100%"
            cellPadding="0"
            cellSpacing="0"
            style={{
              background: "#ffffff",
              border: "1px solid #dcdcdc",
              borderRadius: 4,
              fontSize: 15,
              color: "#2a3940",
              margin: "30px auto",
            }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    padding: "12px 10px",
                    borderBottom: "1px solid #eaeaea",
                    fontWeight: 600,
                    width: "40%",
                  }}
                >
                  Survey Name
                </td>
                <td
                  style={{
                    padding: "12px 10px",
                    borderBottom: "1px solid #eaeaea",
                  }}
                >
                  {survey?.name}
                </td>
              </tr>

              <tr>
                <td
                  style={{
                    padding: "12px 10px",
                    borderBottom: "1px solid #eaeaea",
                    fontWeight: 600,
                  }}
                >
                  Category
                </td>
                <td
                  style={{
                    padding: "12px 10px",
                    borderBottom: "1px solid #eaeaea",
                  }}
                >
                  {survey?.category}
                </td>
              </tr>

              <tr>
                <td
                  style={{
                    padding: "12px 10px",
                    borderBottom: "1px solid #eaeaea",
                    fontWeight: 600,
                  }}
                >
                  Points
                </td>
                <td
                  style={{
                    padding: "12px 10px",
                    borderBottom: "1px solid #eaeaea",
                  }}
                >
                  {survey?.points}
                </td>
              </tr>

              <tr>
                <td style={{ padding: "12px 10px", fontWeight: 600 }}>
                  Estimated Time
                </td>
                <td style={{ padding: "12px 10px" }}>{survey?.time} minutes</td>
              </tr>
            </tbody>
          </table>

          <p
            style={{
              fontSize: 15,
              color: "#2a3940",
              textAlign: "center",
              margin: "10px 0",
              fontWeight: 500,
            }}
          >
            We appreciate your time and input. Click the button below to begin.
          </p>

          <hr
            style={{
              border: 0,
              borderTop: "2px solid #e8e8e8",
              margin: "10px 0",
            }}
          />
          <div style={{ textAlign: "center", margin: "30px 0" }}>
            <a
              href={survey?.link}
              target="_blank"
              style={{
                display: "inline-block",
                background: "#04662b",
                color: "#fff",
                padding: "12px 40px",
                textDecoration: "none",
                fontSize: 18,
                borderRadius: 2,
              }}
            >
              Start Survey
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
