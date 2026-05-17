import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing, Colors } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        
        <View style={styles.heroSection}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>SkillSynq Mobile Platform</Text>
          </View>
          
          <ThemedText type="title" style={styles.title}>
            Optimize Your{'\n'}
            <Text style={styles.highlight}>Job Applications</Text>{'\n'}
            with Precision
          </ThemedText>

          <ThemedText style={styles.subtitle}>
            Analyze your resume against any job description, uncover skill gaps, and generate perfectly tailored cover letters in seconds.
          </ThemedText>
        </View>

        <View style={styles.buttonContainer}>
          <Link href="/explore" asChild>
            <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
              <Text style={styles.primaryButtonText}>Analyze Resume ✨</Text>
            </TouchableOpacity>
          </Link>
          
          <Link href="/explore" asChild>
            <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
              <Text style={styles.secondaryButtonText}>Create Cover Letter 📄</Text>
            </TouchableOpacity>
          </Link>
        </View>

      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
    marginTop: -40,
  },
  badge: {
    backgroundColor: 'rgba(32, 138, 239, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(32, 138, 239, 0.3)',
  },
  badgeText: {
    color: '#208AEF',
    fontWeight: '600',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 38,
    lineHeight: 46,
    fontWeight: '800',
  },
  highlight: {
    color: '#208AEF',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.7,
    marginTop: 10,
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    gap: Spacing.three,
    marginTop: 20,
  },
  primaryButton: {
    backgroundColor: '#208AEF',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#208AEF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(32, 138, 239, 0.3)',
  },
  secondaryButtonText: {
    color: '#208AEF',
    fontSize: 18,
    fontWeight: '700',
  },
});
