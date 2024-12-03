import DetailPage from "../[type]/[id]/detailPage";

export default function Page({
  params,
}: {
  params: { type: string; id: string };
}) {
  // `params` sudah di-*unwrap* di server component
  return <DetailPage params={params} />;
}
