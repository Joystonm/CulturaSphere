# TrendWeaver Advanced Features

This directory contains the implementation of the advanced TrendWeaver features for CulturaSphere. These components provide sophisticated cultural trend analysis and visualization tools.

## Components

### 1. MicroTrendRadar
Detects and visualizes emerging microtrends before they go mainstream.
- Continuously pulls and filters taste signals by region, age group, and domain
- Summarizes spikes or emerging themes in plain English
- Allows users to set alerts for new trends matching selected criteria

### 2. CrossTasteBrandFitAnalyzer
Helps brands discover where they best fit in the cultural landscape.
- Users enter brand/product/service type and select target audiences
- Generates suggested tone, color palette, and visual identity
- Provides launch event ideas and influencer fit recommendations

### 3. PersonaGrowthSimulator
Models how customer personas might evolve over time based on taste transitions.
- Select an existing generated persona
- Visualize projected shifts in taste over 3, 6, and 12 months
- Describes future behaviors and can be exported as a strategic roadmap

### 4. TrendStrategistAssistant
Provides consultant-level experience using Qloo + Groq.
- Interactive chat interface for strategic questions
- Answers questions about campaign ideas, trend intersections, and visual aesthetics
- Replies with insights grounded in affinity data and cultural context

### 5. CrossDomainCulturalFunnel
Helps brands understand the customer journey across multiple taste domains.
- Visualizes how interests in one domain lead to engagement in others
- Shows touchpoints for content, commerce, and engagement
- Provides strategic insights based on the funnel analysis

### 6. CulturalWhitespaceFinder
Identifies untapped or low-competition cultural intersections for innovation.
- Finds combinations of tastes with strong internal affinity but low market saturation
- Generates concept briefs, sample product ideas, and suggested cultural ambassadors
- Helps brands discover new market opportunities

### 7. TasteDivergenceMap
Analyzes how one taste splits into different domains across regions or demographics.
- Compares how cultural tastes manifest differently across regions
- Visualizes strength of connections in different domains
- Provides strategic localization reports for global brands

### 8. CulturalTimeMachine
Lets users rewind or fast-forward cultural trends to understand context and make predictions.
- Choose a cultural taste and a year (past, present, or future)
- See key characteristics, cultural context, and connected trends
- Ideal for generational analysis and future-forward planning

## Integration

These components are integrated into the TrendWeaver page, which provides a navigation interface to switch between different features. The page also includes an overview section that introduces users to the available tools.

## Styling

The components use the styles defined in `/client/src/styles/trend-weaver.css`, which provides consistent styling across all TrendWeaver features.

## Data Sources

In a production environment, these components would connect to:
- Qloo API for taste affinity data
- Groq LLM for natural language generation and analysis

For the current implementation, they use sample data to demonstrate functionality.
