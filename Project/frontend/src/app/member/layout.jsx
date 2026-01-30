import MemberHeader from "./components/MemberHeader";
import MemberSidebar from "./components/MemberSidebar";
import MemberFooter from "./components/MemberFooter";

function layout({ children }) {
  return (
    <div>
      <MemberHeader />
      <MemberSidebar>
        <main>{ children }</main>
      </MemberSidebar>
      <MemberFooter />
    </div>
  );
}

export default layout;
