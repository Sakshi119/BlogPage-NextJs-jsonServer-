import { Suspense } from "react";
import CreateFormClient from "./CreateFormClient";

export default function CreateNewBlogPage() {
  return (
    <Suspense fallback={<p>Loading form...</p>}>
      <CreateFormClient />
    </Suspense>
  );
}
