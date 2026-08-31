import { ResumeData } from '../../types/resume';
import Template1 from './Template1';
import Template2 from './Template2';

interface Props {
  data: ResumeData;
}

const templateMap: Record<string, React.ComponentType<{ data: ResumeData }>> = {
  'template-1': Template1,
  'template-2': Template2,
};

export default function DynamicTemplateRenderer({ data }: Props) {
  const SelectedTemplate = templateMap[data.templateId] || Template1;
  return <SelectedTemplate data={data} />;
}