package com.shop.service;

import java.util.List;

import com.shop.entity.ScoreRecord;

public interface ScoreRecordService {
	
	List<ScoreRecord> listScoreRecord();
	
	List<ScoreRecord> getScoreRecordByName(String name);
	
	Integer insertScoreRecord(ScoreRecord scoreRecord);
	
	Integer updateScoreRecord(ScoreRecord scoreRecord);
	
	Integer deleteScoreRecord(Long id);
	
}
