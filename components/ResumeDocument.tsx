import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Define TypeScript interface for tailored data
export interface ResumeData {
  fullName: string;
  summary: string;
  skills: string[];
  experience: {
    company: string;
    role: string;
    bullets: string[];
  }[];
}

// Define ATS-Friendly & Visually Modern Styles
const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 36,
    paddingLeft: 40,
    paddingRight: 40,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
    color: "#1e293b", // Dark Slate
  },
  // Header Section
  header: {
    borderBottomWidth: 2,
    borderBottomColor: "#2563eb", // Royal Accent Blue
    borderBottomStyle: "solid",
    paddingBottom: 12,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  tagline: {
    fontSize: 10,
    color: "#64748b",
    marginTop: 3,
  },
  // Reusable Section Styles
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#1e40af", // Deep Blue Accent
    textTransform: "uppercase",
    letterSpacing: 0.8,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    borderBottomStyle: "solid",
    paddingBottom: 3,
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.45,
    color: "#334155",
  },
  // Skills Grid / Pills Layout
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  skillBadge: {
    backgroundColor: "#f1f5f9",
    borderRadius: 3,
    paddingVertical: 3,
    paddingHorizontal: 7,
    marginRight: 4,
    marginBottom: 4,
  },
  skillText: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: "#334155",
  },
  // Experience Section Layout
  expItem: {
    marginBottom: 10,
  },
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 4,
  },
  roleTitle: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
  },
  companyName: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Oblique",
    color: "#475569",
  },
  bulletContainer: {
    flexDirection: "row",
    marginBottom: 3,
    paddingLeft: 4,
  },
  bulletDot: {
    width: 10,
    fontSize: 9,
    color: "#2563eb",
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.4,
    color: "#334155",
  },
});

export const ResumeDocument: React.FC<{ data: ResumeData }> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Top Header / Candidate Name */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.fullName || "Your Full Name"}</Text>
        <Text style={styles.tagline}>Tailored Resume • ATS Optimized</Text>
      </View>

      {/* Professional Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text style={styles.summaryText}>{data.summary}</Text>
      </View>

      {/* Relevant Skills */}
      {data.skills && data.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Skills & Competencies</Text>
          <View style={styles.skillsContainer}>
            {data.skills.map((skill, index) => (
              <View key={index} style={styles.skillBadge}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Professional Experience */}
      {data.experience && data.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {data.experience.map((exp, idx) => (
            <View key={idx} style={styles.expItem}>
              <View style={styles.expHeader}>
                <Text style={styles.roleTitle}>{exp.role}</Text>
                <Text style={styles.companyName}>{exp.company}</Text>
              </View>
              {exp.bullets?.map((bullet, bIdx) => (
                <View key={bIdx} style={styles.bulletContainer}>
                  <Text style={styles.bulletDot}>•</Text>
                  <Text style={styles.bulletText}>{bullet}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);