import { redirect } from 'next/navigation';

export default function PokemonSearchPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const id = searchParams.id;
  if (id) {
    redirect(`/pokemon/${id}`);
  }
  // IDがない場合は、デフォルトのページやエラーメッセージを表示できます
  return <div>ポケモン番号を入力してください。</div>;
}