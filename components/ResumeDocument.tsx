import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

export interface ResumeData {
  templateId?: "minimal" | "creative";
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location?: string;
  summary: string;
  skills: string[];
  experience: {
    company: string;
    role: string;
    bullets: string[];
  }[];
  education?: {
    school: string;
    degree: string;
    year: string;
  }[];
}

// Minimal Modern Styles (Template 1)
const minimalStyles = StyleSheet.create({
  page: { padding: 36, fontFamily: "Helvetica", backgroundColor: "#FFFFFF", color: "#1e293b" },
  header: { borderBottomWidth: 2, borderBottomColor: "#2563eb", paddingBottom: 10, marginBottom: 14 },
  name: { fontSize: 22, fontFamily: "Helvetica-Bold", color: "#0f172a", textTransform: "uppercase" },
  title: { fontSize: 11, color: "#2563eb", fontFamily: "Helvetica-Bold", marginTop: 2 },
  contactRow: { flexDirection: "row", gap: 12, marginTop: 6, fontSize: 8.5, color: "#64748b" },
  section: { marginBottom: 12 },
  sectionTitle: { fontSize: 11, fontFamily: "Helvetica-Bold", color: "#1e40af", textTransform: "uppercase", borderBottomWidth: 1, borderBottomColor: "#e2e8f0", paddingBottom: 2, marginBottom: 6 },
  summaryText: { fontSize: 9, lineHeight: 1.4, color: "#334155" },
  skillsContainer: { flexDirection: "row", flexWrap: "wrap", gap: 4 },
  skillBadge: { backgroundColor: "#f1f5f9", borderRadius: 3, paddingVertical: 2, paddingHorizontal: 6 },
  skillText: { fontSize: 8, fontFamily: "Helvetica-Bold", color: "#334155" },
  expItem: { marginBottom: 8 },
  expHeader: { flexDirection: "row", justifyBetween: "space-between", marginBottom: 3 },
  roleTitle: { fontSize: 9.5, fontFamily: "Helvetica-Bold", color: "#0f172a" },
  companyName: { fontSize: 8.5, fontFamily: "Helvetica-Oblique", color: "#475569" },
  bulletContainer: { flexDirection: "row", marginBottom: 2, paddingLeft: 4 },
  bulletDot: { width: 8, fontSize: 8, color: "#2563eb" },
  bulletText: { flex: 1, fontSize: 8.5, lineHeight: 1.35, color: "#334155" },
});

// Creative Sidebar Styles (Template 2)
const creativeStyles = StyleSheet.create({
  page: { flexDirection: "row", fontFamily: "Helvetica", backgroundColor: "#FFFFFF" },
  sidebar: { width: "32%", backgroundColor: "#0f172a", color: "#ffffff", padding: 20 },
  main: { width: "68%", padding: 24, color: "#1e293b" },
  sidebarName: { fontSize: 18, fontFamily: "Helvetica-Bold", color: "#38bdf8", textTransform: "uppercase" },
  sidebarTitle: { fontSize: 10, color: "#94a3b8", marginTop: 4, marginBottom: 16 },
  sidebarSectionTitle: { fontSize: 10, fontFamily: "Helvetica-Bold", color: "#38bdf8", textTransform: "uppercase", borderBottomWidth: 1, borderBottomColor: "#334155", paddingBottom: 3, marginBottom: 8 },
  sidebarText: { fontSize: 8.5, color: "#cbd5e1", marginBottom: 4 },
  mainSectionTitle: { fontSize: 11, fontFamily: "Helvetica-Bold", color: "#0f172a", textTransform: "uppercase", borderBottomWidth: 1, borderBottomColor: "#cbd5e1", paddingBottom: 3, marginBottom: 8 },
  expItem: { marginBottom: 10 },
  roleTitle: { fontSize: 10, fontFamily: "Helvetica-Bold", color: "#0f172a" },
  companyName: { fontSize: 8.5, fontFamily: "Helvetica-Oblique", color: "#64748b", marginBottom: 3 },
  bulletContainer: { flexDirection: "row", marginBottom: 2 },
  bulletDot: { width: 8, fontSize: 8, color: "#0284c7" },
  bulletText: { flex: 1, fontSize: 8.5, lineHeight: 1.35, color: "#334155" },
});

export const ResumeDocument: React.FC<{ data: ResumeData }> = ({ data }) => {
  const isCreative = data.templateId === "creative";

  if (isCreative) {
    return (
      <Document>
        <Page size="A4" style={creativeStyles.page}>
          {/* Left Sidebar */}
          <View style={creativeStyles.sidebar}>
            <Text style={creativeStyles.sidebarName}>{data.fullName || "Your Name"}</Text>
            <Text style={creativeStyles.sidebarTitle}>{data.jobTitle || "Target Role"}</Text>

            <View style={{ marginBottom: 16 }}>
              <Text style={creativeStyles.sidebarSectionTitle}>Contact</Text>
              {data.email && <Text style={creativeStyles.sidebarText}>{data.email}</Text>}
              {data.phone && <Text style={creativeStyles.sidebarText}>{data.phone}</Text>}
              {data.location && <Text style={creativeStyles.sidebarText}>{data.location}</Text>}
            </View>

            <View>
              <Text style={creativeStyles.sidebarSectionTitle}>Skills</Text>
              {data.skills?.map((skill, idx) => (
                <Text key={idx} style={creativeStyles.sidebarText}>• {skill}</Text>
              ))}
            </View>
          </View>

          {/* Right Main Content */}
          <View style={creativeStyles.main}>
            <View style={{ marginBottom: 14 }}>
              <Text style={creativeStyles.mainSectionTitle}>About Me</Text>
              <Text style={{ fontSize: 9, lineHeight: 1.4, color: "#334155" }}>{data.summary}</Text>
            </View>

            <View>
              <Text style={creativeStyles.mainSectionTitle}>Experience</Text>
              {data.experience?.map((exp, idx) => (
                <View key={idx} style={creativeStyles.expItem}>
                  <Text style={creativeStyles.roleTitle}>{exp.role}</Text>
                  <Text style={creativeStyles.companyName}>{exp.company}</Text>
                  {exp.bullets?.map((b, bIdx) => (
                    <View key={bIdx} style={creativeStyles.bulletContainer}>
                      <Text style={creativeStyles.bulletDot}>•</Text>
                      <Text style={creativeStyles.bulletText}>{b}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>
        </Page>
      </Document>
    );
  }

  // Fallback Minimal Template
  return (
    <Document>
      <Page size="A4" style={minimalStyles.page}>
        <View style={minimalStyles.header}>
          <Text style={minimalStyles.name}>{data.fullName || "Your Name"}</Text>
          <Text style={minimalStyles.title}>{data.jobTitle || "Target Role"}</Text>
          <View style={minimalStyles.contactRow}>
            {data.email && <Text>{data.email}</Text>}
            {data.phone && <Text>• {data.phone}</Text>}
            {data.location && <Text>• {data.location}</Text>}
          </View>
        </View>

        <View style={minimalStyles.section}>
          <Text style={minimalStyles.sectionTitle}>Professional Summary</Text>
          <Text style={minimalStyles.summaryText}>{data.summary}</Text>
        </View>

        {data.skills?.length > 0 && (
          <View style={minimalStyles.section}>
            <Text style={minimalStyles.sectionTitle}>Skills</Text>
            <View style={minimalStyles.skillsContainer}>
              {data.skills.map((s, i) => (
                <View key={i} style={minimalStyles.skillBadge}>
                  <Text style={minimalStyles.skillText}>{s}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {data.experience?.length > 0 && (
          <View style={minimalStyles.section}>
            <Text style={minimalStyles.sectionTitle}>Experience</Text>
            {data.experience.map((exp, idx) => (
              <View key={idx} style={minimalStyles.expItem}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={minimalStyles.roleTitle}>{exp.role}</Text>
                  <Text style={minimalStyles.companyName}>{exp.company}</Text>
                </View>
                {exp.bullets?.map((b, bIdx) => (
                  <View key={bIdx} style={minimalStyles.bulletContainer}>
                    <Text style={minimalStyles.bulletDot}>•</Text>
                    <Text style={minimalStyles.bulletText}>{b}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};