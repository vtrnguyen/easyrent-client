import PropertyDetailPage from '../_components/PropertyDetailPage';

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function UpdatePropertyPage({ params }: Props) {
    const { id } = await params;

    return <PropertyDetailPage propertyId={id} />;
}
