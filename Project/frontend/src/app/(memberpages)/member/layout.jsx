import MemberHeader from "./components/MemberHeader";
import MemberSidebar from "./components/MemberSidebar";
import MemberFooter from "./components/MemberFooter";
import FeedbackForm from "@/componentsMHO/FeedbackForm";
import { Popup } from "@/components/Popup";

function layout({ children }) {
  return (
    <div>
      <MemberHeader />
      <MemberSidebar>
        <main>{children}</main>
      </MemberSidebar>
      <MemberFooter />
      {/* <Popup open={true} onClose={() => {}} hideTitle maxWidth="sm">
          <FeedbackForm />
        </Popup> */}
    </div>
  );
}

export default layout;
