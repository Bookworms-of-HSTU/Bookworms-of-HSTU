import { adminFirestore } from "@/lib/firebase/server";
import CommitteeManager from './CommitteeManager';

// This forces the page to be dynamically rendered on every request, ensuring fresh data.
export const dynamic = 'force-dynamic';

async function getCommittees() {
  const committeesCollection = adminFirestore.collection("committee");
  const committeesSnapshot = await committeesCollection.get();
  const committeesList = committeesSnapshot.docs.reduce((acc, doc) => {
    const data = doc.data();
    const committeeName = data.committee;
    if (!acc[committeeName]) {
      acc[committeeName] = [];
    }
    acc[committeeName].push({ id: doc.id, ...data });
    return acc;
  }, {});
  return committeesList;
}

export default async function AdminCommitteePage() {
  const committees = await getCommittees();

  return (
    <div>
      <CommitteeManager initialCommittees={committees} />
    </div>
  );
}
